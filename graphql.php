<?php

require_once 'sql_queries.inc';
require_once 'cors.inc';

require_once 'vendor/autoload.php';

require_once 'graphql/MyGraphQLExceptions.inc';

require_once 'graphql/ManuscriptMetaData.inc';
require_once 'graphql/User.inc';
require_once 'graphql/LoggedInUser.inc';

require_once 'model/TransliterationTextLine.inc';
require_once 'model/StringContent.inc';
require_once 'model/CorrectionType.inc';
require_once 'model/DamageType.inc';
require_once 'model/ManuscriptSide.inc';

use GraphQL\Error\{DebugFlag, FormattedError};
use GraphQL\GraphQL;
use GraphQL\Type\{Schema, SchemaConfig};
use GraphQL\Type\Definition\{ObjectType, Type};
use ReallySimpleJWT\Token;
use tlh_dig\graphql\{InvalidTokenException,
  LoggedInUser,
  ManuscriptMetaData,
  MySafeGraphQLException,
  TransliterationTextLine,
  User
};
use tlh_dig\model\ManuscriptSide;

# Must be 12 characters in length, contain upper and lower case letters, a number, and a special character `*&!@%^#$``
$jwtSecret = '1234%ASDf_0aosd';

$jwtValidityTime = 3600;

$queryType = new ObjectType([
  'name' => 'Query',
  'fields' => [
    'allManuscripts' => [
      'type' => Type::nonNull(Type::listOf(Type::nonNull(ManuscriptMetaData::$graphQLType))),
      'resolve' => function (): array {
        return allManuscriptMetaData();
      }
    ],
    'manuscript' => [
      'type' => ManuscriptMetaData::$graphQLType,
      'args' => [
        'mainIdentifier' => Type::nonNull(Type::string())
      ],
      'resolve' => function ($rootValue, array $args): ?ManuscriptMetaData {
        return manuscriptMetaDataById($args['mainIdentifier']);
      }
    ]
  ]
]);

$manuscriptMutationsType = new ObjectType([
  'name' => 'ManuscriptMutations',
  'fields' => [
    'updateTransliteration' => [
      'type' => Type::string(),
      'args' => [
        'values' => Type::nonNull(Type::listOf(Type::nonNull(TransliterationTextLine::$graphQLInputType)))
      ],
      'resolve' => function (ManuscriptMetaData $manuscriptMetaData, array $args): ?string {
        return 'TODO!';
      }
    ]
  ]
]);

$loggedInUserMutationsType = new ObjectType([
  'name' => 'LoggedInUserMutations',
  'fields' => [
    'createManuscript' => [
      'type' => Type::string(),
      'args' => [
        'values' => ManuscriptMetaData::$graphQLInputObjectType
      ],
      'resolve' => function (string $username, array $args): ?string {
        $manuscript = ManuscriptMetaData::fromGraphQLInput($args['values'], $username);

        $manuscriptIdentifier = $manuscript->mainIdentifier->identifier;

        $manuscriptInserted = insertManuscriptMetaData($manuscript);

        if ($manuscriptInserted) {
          return $manuscriptIdentifier;
        } else {
          throw new MySafeGraphQLException("Could not save manuscript $manuscriptIdentifier to Database!");
        }
      }
    ],
    'manuscript' => [
      'type' => $manuscriptMutationsType,
      'args' => [
        'mainIdentifier' => Type::string()
      ],
      'resolve' => function (string $username, array $args): ?ManuscriptMetaData {
        // TODO: resolve manuscript metadata from db!
        return null;
      }
    ]
  ]
]);

$mutationType = new ObjectType([
  "name" => "Mutation",
  'fields' => [
    'register' => [
      'args' => [
        'userInput' => Type::nonNull(User::$graphQLInputObjectType)
      ],
      'type' => Type::string(),
      'resolve' => function ($rootValue, array $args): string {
        $user = User::fromGraphQLInput($args['userInput']);

        if ($user === null) {
          throw new MySafeGraphQLException("Could not read input!");
        }

        $inserted = insertUserIntoDatabase($user);

        if ($inserted) {
          return $user->username;
        } else {
          throw new MySafeGraphQLException("Could not insert user into database!");
        }
      }
    ],
    'login' => [
      'args' => [
        'username' => Type::nonNull(Type::string()),
        'password' => Type::nonNull(Type::string())
      ],
      'type' => LoggedInUser::$graphQLType,
      'resolve' => function ($rootValue, array $args): ?LoggedInUser {
        global $jwtSecret, $jwtValidityTime;

        $user = maybeUserFromDatabase($args['username']);

        if ($user !== null && password_verify($args['password'], $user->pwHash)) {
          return new LoggedInUser(
            $user->username,
            $user->name,
            $user->affiliation,
            Token::create($user->username, $jwtSecret, time() + $jwtValidityTime, 'localhost')
          );
        } else {
          throw new MySafeGraphQLException("Could not verify user!");
        }
      }
    ],
    'me' => [
      'args' => [
        'jwt' => Type::nonNull(Type::string())
      ],
      'type' => $loggedInUserMutationsType,
      'resolve' => function ($rootValue, array $args): ?string {
        global $jwtSecret;

        $jwt = $args['jwt'];

        if (!Token::validate($jwt, $jwtSecret)) {
          throw new InvalidTokenException('Invalid login information. Maybe your login is expired? Try logging out and logging back in again.');
        }

        try {
          return Token::getPayload($jwt, $jwtSecret)['user_id'];
        } catch (Exception $e) {
          throw new InvalidTokenException('Invalid login information. Maybe your login is expired? Try logging out and logging back in again.');
        }
      }
    ]
  ]
]);


try {
  $schema = new Schema(
    SchemaConfig::create()
      ->setQuery($queryType)
      ->setMutation($mutationType)
      ->setTypes([ManuscriptSide::$graphQLEnumType])
  );

  $rawInput = file_get_contents('php://input');
  $input = json_decode($rawInput, true);

  if ($input != null) {

    $variablesValues = isset($input['variables']) ? $input['variables'] : null;
    $operationName = isset($input['operationName']) ? $input['operationName'] : null;

    $debug = DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE | DebugFlag::RETHROW_INTERNAL_EXCEPTIONS | DebugFlag::RETHROW_UNSAFE_EXCEPTIONS;

    $query = $input['query'];

    $output = GraphQL::executeQuery($schema, $query, null, null, $variablesValues, $operationName)
      ->toArray($debug);
  } else {
    $output = [
      'data' => null,
      'errors' => [FormattedError::createFromException(new Exception('No input given!'))]
    ];
  }
} catch (Exception $e) {
  error_log($e);

  $output = [
    'data' => null,
    'errors' => [FormattedError::createFromException($e)]
  ];
}

cors();

header('Content-Type: application/json; charset=UTF-8', true, 200);

echo json_encode($output);

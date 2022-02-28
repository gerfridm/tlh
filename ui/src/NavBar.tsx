import {NavLink, useNavigate} from 'react-router-dom';
import {createManuscriptUrl, editDocumentUrl, homeUrl, loginUrl, preferencesUrl, registerUrl, xmlComparatorUrl} from './urls';
import {LanguageSelector} from './LanguageSelector';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {activeUserSelector} from './store/store';
import {Dispatch} from 'react';
import {StoreAction, userLoggedOutAction} from './store/actions';

export function NavBar(): JSX.Element {

  const {t} = useTranslation('common');
  const user = useSelector(activeUserSelector);
  const dispatch = useDispatch<Dispatch<StoreAction>>();
  const navigate = useNavigate();

  function logout() {
    dispatch(userLoggedOutAction);
    navigate(loginUrl);
  }

  return (
    <nav className="flex flex-row bg-gray-800 text-white">
      <NavLink className="p-4 hover:bg-slate-700 font-extrabold" to={homeUrl}>TLH<sup>dig</sup></NavLink>

      {user && <NavLink className="p-4 ml-4 hover:bg-slate-700" to={createManuscriptUrl}>{t('createManuscript')}</NavLink>}
      <NavLink className="p-4 ml-4 hover:bg-slate-700" to={editDocumentUrl}>{t('editDocument')}</NavLink>
      <NavLink className="p-4 ml-4 hover:bg-slate-700" to={xmlComparatorUrl}>{t('xmlComparator')}</NavLink>

      <div className="flex-grow"/>

      <NavLink className="p-4 ml-4 hover:bg-slate-700" to={preferencesUrl}>{t('preferences')}</NavLink>

      <div className="p-4 ml-4 hover:bg-slate-700">
        <LanguageSelector/>
      </div>

      {user
        ? <button className="p-4 ml-4 hover:bg-slate-700" onClick={logout}>{t('logout')} {user.name}</button>
        : <>
          <NavLink className="p-4 ml-4 hover:bg-slate-700" to={registerUrl}>{t('register')}</NavLink>
          <NavLink className="p-4 ml-4 hover:bg-slate-700" to={loginUrl}>{t('login')}</NavLink>
        </>
      }
    </nav>
  );
}
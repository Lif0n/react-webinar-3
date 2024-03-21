import { memo, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import ProfileTools from "../../containers/profile-tools";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import ProfileCard from "../../components/profile-card";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";
import useInit from "../../hooks/use-init";


function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  useInit(async() => {
    await store.actions.profile.setUser();
  });

  const select = useSelector(state => ({
    token: state.session.token,
    user: state.profile.data,
    waiting: state.session.waiting
  }));

  useEffect(() => {
    console.log(select.user);
    if (!select.token) {
      navigate('/login');
    }
  }, [select.waiting, select.user])

  return (
    <PageLayout>
      <ProfileTools />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
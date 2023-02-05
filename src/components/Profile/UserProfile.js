import ProfileForm from './ProfileForm';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={styles.profile}>
      <h1>* Your Profile *</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
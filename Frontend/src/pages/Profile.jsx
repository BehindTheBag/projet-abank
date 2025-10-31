import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { fetchProfile, updateUserNameServer } from "../redux/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { userProfile, loading, error, updating, updateError } = useSelector(
    (state) => state.user
  );

  // état local pour l’édition du userName 
  const [editing, setEditing] = useState(false);
  const [userName, setUserName] = useState("");

  // récupération du profil
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // formulaire d’édition 
  const handleEditClick = () => {
    setEditing(true);
    setUserName(userProfile?.userName || "");
  };

  // sauvegarder le nouveau userName
  const handleSave = async (e) => {
    e.preventDefault();
    if (userProfile && userName === userProfile.userName) {
      setEditing(false);
      return;
    }
    const action = await dispatch(updateUserNameServer(userName));
    if (updateUserNameServer.fulfilled.match(action)) {
      await dispatch(fetchProfile()); // rafraîchir header + page
      setEditing(false);
    }
  };

  return (
    <div className="page-container">
      <Header />

      <main className="main bg-dark main-content">
        {loading && <p className="sr-only">Chargement</p>}
        {error && <p className="form-error">{error}</p>}

        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile ? (userProfile.userName || "") + "!" : ""}
          </h1>


        {/* Formulaire d'édition */}
          {editing ? (
            <form className="edit-name-form" onSubmit={handleSave}>
              <div className="input-wrapper">
                <label htmlFor="userName">User Name</label>
                <input
                  id="userName"
                  type="text"
                  className="input-lg input-wide"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="edit-buttons">
                <button type="submit" className="edit-button" disabled={updating}>
                  {updating ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>
              </div>


                   {/* affiche l'erreur si PUT fonctionne pas */}
              {updateError && <p className="form-error">{updateError}</p>}
            </form>
          ) : (
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>

        {/* mock*/}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>

        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;

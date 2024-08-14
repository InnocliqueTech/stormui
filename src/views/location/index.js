import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './indexLanding.scss';
import './location.css';
// import { useNavigate } from 'react-router-dom';
import map from '../../assets/images/map.png';
// import { ClientsContext } from '../dashboard/context';

const dummyData = {
  Population: '3,23,412',
  'no.of Households': '61840',
  source: 'Lower Manair dam',
  'No. of Wards': '60',
  'Distribution length': '315 KMS',
  'Installed Capacity': '58 MD',
  'Tap water connections': '60',
  'Storage Capacity': '315 KMS',
  'Present Supply': '58 MD'
};



export default function Location() {
  // const navigate = useNavigate();
  // const { clients } = useContext(ClientsContext);

  // const handleClick = () => {
  //   navigate('/app/dashboard/default', { replace: true });
  //   window.location.reload();
  // };

  // console.log(clients, 'clients');

  // useEffect(() => {
  // // Check if the page has already been reloaded
  // if (!sessionStorage.getItem('reloaded')) {
  //   // Set the flag to indicate the page has been reloaded
  //   sessionStorage.setItem('reloaded', 'true');

  //   // Reload the page
  //   window.location.reload();
  // }
  // }, [])

  return (
    <div
      className="home-section"
    // onClick={handleClick}
    // onKeyDown={(e) => {
    //   if (e.key === 'Enter' || e.key === ' ') {
    //     handleClick(e);
    //   }
    // }}
    // role="button"
    // tabIndex="0"
    >
      <section>
        <h3 className="welcome"> Welcome...</h3>
      </section>
      <section className="flex-section">
        <div className="map-img">
          <img src={map} alt="bhopal" />
        </div>
        <div className="about-section">
          <div className="info">
            <h3>About</h3>
            <p className="first-para">
              I am a passionate and detail-oriented UX designer with 3+ years of experience creating user-centered interfaces for web and
              mobile applications. I am highly skilled in user research, wireframing, prototyping, and usability testing. I am a strong
              believer in the power of design to solve problems and create a positive user experience.
            </p>
            <p className="second-para">
              “The primary objective of the Karimnagar Smart City Project is to improve the quality of life of even poorest of poor and
              improve happiness index of all its citizens.”
            </p>
          </div>
          {/* <div className="area-data">
            {Object.keys(dummyData).map((item) => {
              return (
                <div key={item} className="data-card">
                  <p>{item}</p>
                  <h2>{dummyData[item]}</h2>
                </div>
              );
            })}
          </div> */}

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            {Object.keys(dummyData).map((item, index) => (
              <div key={index} style={{
                flex: "0 0 calc(33.333% - 20px)",
                boxSizing: "border-box",
                backgroundColor: "white",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "8px",
                // textAlign: "center",
                marginRight: index % 3 !== 2 ? "20px" : "0", // Add margin except for the last card in a row
              }}>
                <p style={{ margin: "0", fontWeight: "bold", fontSize:"14px", color:"#6c757d" }}>{item}</p>
                <h2 style={{ marginTop: "10px", fontSize:"14px" }}>{dummyData[item]}</h2>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

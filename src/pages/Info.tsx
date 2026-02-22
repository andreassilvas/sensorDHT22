export const Info = () => {
  return (
    <div className="container">
      <div className="row mb-5">
        <div className="col d-flex justify-content-end">
          <button className="btn btn-purple">
            Télécharger la documentation
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="card customCard-s text-secondary">
            <div className="card-header pt-3 border-0 customCard-s">
              <h6>
                Projet Raspberry Pi intégrant un capteur DHT22 de mesure de la
                température et de l’humidité.
              </h6>
            </div>
            <div className="card-body">
              <div>
                <p>Février 2026</p>
                <p className="fw-bold">
                  Compétence 00SX - Objets connectés (IoT).
                </p>
                <ul className="list-group customList-s">
                  <li className="list-group-item mb-2 rounded-5">
                    Configuration et administration Linux (Raspberry Pi OS).
                  </li>
                  <li className="list-group-item mb-2 rounded-5">
                    Backend Python (API REST, traitement des données).
                  </li>
                  <li className="list-group-item mb-2 rounded-5">
                    Frontend React.js (fetch, rendu dynamique).
                  </li>
                  <li className="list-group-item mb-2 rounded-5">
                    Communication client–serveur (HTTP, JSON, Fetch API).
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card customCard text-secondary">
            <div className="card-header pt-3 border-0 customCard">
              <h6>
                La liste ci-dessous détaille les composants requis pour la mise
                en place d’un projet Raspberry Pi intégrant un capteur DHT22.
              </h6>
            </div>
            <div className="card-body">
              <ol className="list-group customList">
                <li className="list-group-item d-flex justify-content-between align-items-start mb-2 rounded-5">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Raspberry Pi</div>
                    Model: Zero 2W
                  </div>
                  <span className="badge customBadge rounded-pill">1</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded-5 mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Raspberry Pi power supply</div>
                    5V 3A power supply
                  </div>
                  <span className="badge customBadge rounded-pill">1</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded-5 mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Sensor</div>
                    DHT22 Digital Temperature and humidity. (Ce modèle est livré
                    avec des connecteurs.)
                  </div>
                  <span className="badge customBadge rounded-pill">1</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded-5 mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">SD carte</div>
                    64 Bit
                  </div>
                  <span className="badge customBadge rounded-pill">1</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded-5 mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">
                      Mini HDMI adaptateur (facultatif)
                    </div>
                    pour se connecter à un moniteur.
                  </div>
                  <span className="badge customBadge rounded-pill">1</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start rounded-5 mb-2">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">USB 2.0 Hub (facultatif)</div>
                    pour connecter un clavier et une souris.
                  </div>
                  <span className="badge customBadge rounded-pill">1</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Documentation = () => {
  return (
    <div style={{ height: "100vh" }}>
      <object
        data="/capteurDHT22.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Votre navigateur ne peut pas afficher le PDF.
          <a href="/capteurDHT22.pdf">Télécharger la documentation</a>
        </p>
      </object>
    </div>
  );
};

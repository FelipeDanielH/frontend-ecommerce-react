// MetodoPagoForm.jsx
export default function MetodoPagoForm({ metodoPago, setMetodoPago }) {
    const opciones = ["BancoSimple", "TarjetaCredito", "Transferencia"];
  
    return (
      <div className="card shadow-sm p-3">
        <h6 className="fw-bold mb-3">Método de pago</h6>
        <div className="d-flex flex-column gap-2">
          {opciones.map((opcion) => (
            <div
              key={opcion}
              className={`card p-3 cursor-pointer ${metodoPago === opcion ? "border-primary" : ""}`}
              onClick={() => setMetodoPago(opcion)}
              style={{ cursor: "pointer" }}
            >
              <strong>{opcion}</strong>
              <small className="text-muted">
                {opcion === "BancoSimple"
                  ? "Pago simulado desde banco"
                  : opcion === "TarjetaCredito"
                  ? "Visa, Mastercard, Amex"
                  : "CBU / Alias"}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
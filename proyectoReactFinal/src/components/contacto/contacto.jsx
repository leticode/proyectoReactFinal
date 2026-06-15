function contacto() {
  return (
    <section className="contacto">

      <h1>Contacto</h1>

      <p className="contacto-subtitulo">
        Estamos para ayudarte. Si tenés consultas sobre nuestros tratamientos o
        querés solicitar un turno, comunicate con nosotros.
      </p>

      <div className="contacto-container">

        <div className="info-contacto">

          <h2>Información</h2>

          <p><strong>📍 Dirección:</strong> Rosario, Santa Fe</p>

          <p><strong>📞 Teléfono:</strong> (341) 555-1234</p>

          <p><strong>✉️ Email:</strong> contacto@pureskin.com</p>

          <p><strong>🕒 Horarios:</strong></p>

          <p>Lunes a Viernes: 9:00 - 20:00</p>

          <p>Sábados: 9:00 - 14:00</p>

        </div>

        <div className="form-contacto">

          <h2>Envíanos un mensaje</h2>

          <form>

            <input
              type="text"
              placeholder="Nombre"
            />

            <input
              type="email"
              placeholder="Correo electrónico"
            />

            <textarea
              rows="6"
              placeholder="Escribí tu mensaje..."
            ></textarea>

            <button type="submit">
              Enviar
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

export default contacto;
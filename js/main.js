document.getElementById('registroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const jugadorId = document.getElementById('jugadorId').value.trim();
  const jugadorTag = document.getElementById('jugadorTag').value.trim();
  const rol = document.getElementById('rol').value.trim();
  const elo = document.getElementById('elo').value.trim();
  const correo = document.getElementById('correo').value.trim();

  if (!jugadorId || !jugadorTag || !rol || !elo || !correo) {
    document.getElementById('mensaje').textContent = "❌ Todos los campos son obligatorios.";
    return;
  }

  // 🔍 Validamos que no exista la misma combinación jugadorId + jugadorTag
  db.collection('inscripciones')
    .where('jugadorId', '==', jugadorId)
    .where('jugadorTag', '==', jugadorTag)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        document.getElementById('mensaje').textContent = "⚠️ Ya existe un jugador con ese ID y Tag.";
        return;
      }

      // ✅ No existe, podemos registrar
      db.collection('inscripciones').add({
        jugadorId,
        jugadorTag,
        rol,
        elo,
        Correo: correo,
        fecha: new Date()
      })
        .then(() => {
          document.getElementById('mensaje').textContent = "✅ Inscripción exitosa.";
          document.getElementById('registroForm').reset();
          document.getElementById('registroForm').style.display = 'none';
        })
        .catch((error) => {
          console.error("Error al guardar:", error);
          document.getElementById('mensaje').textContent = "❌ Error: " + error.message;
        });
    })
    .catch((error) => {
      console.error("Error al verificar duplicados:", error);
      document.getElementById('mensaje').textContent = "❌ Error al verificar inscripción.";
    });
});

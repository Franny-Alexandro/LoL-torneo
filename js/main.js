document.getElementById('registroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const jugadorId = document.getElementById('jugadorId').value.trim();
  const jugadorTag = document.getElementById('jugadorTag').value.trim();
  const rol = document.getElementById('rol').value.trim();
  const elo = document.getElementById('elo').value.trim();

  console.log("Datos capturados:", { jugadorId, jugadorTag, rol, elo });

  if (!jugadorId || !jugadorTag || !rol || !elo) {
    document.getElementById('mensaje').textContent = "❌ Todos los campos son obligatorios.";
    return;
  }

  db.collection('inscripciones').add({
    jugadorId,
    jugadorTag,
    rol,
    elo,
    fecha: new Date()
  })
  .then(() => {
    document.getElementById('mensaje').textContent = "✅ Inscripción exitosa.";
    document.getElementById('registroForm').reset();
  })
  .catch((error) => {
    console.error("Error al guardar:", error);
    document.getElementById('mensaje').textContent = "❌ Error: " + error.message;
  });
});
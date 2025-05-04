document.addEventListener('DOMContentLoaded', () => {
  // Verificar si ya está inscrito
  const yaInscrito = localStorage.getItem('inscripcionCompletada');
  if (yaInscrito === 'true') {
    document.getElementById('mensaje').textContent = "✅ Ya estás inscrito.";
    document.getElementById('registroForm').style.display = 'none';
  }
});

document.getElementById('registroForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Verificación previa
  if (localStorage.getItem('inscripcionCompletada') === 'true') {
    document.getElementById('mensaje').textContent = "⚠️ Ya has enviado el formulario.";
    return;
  }

  const jugadorId = document.getElementById('jugadorId').value.trim();
  const jugadorTag = document.getElementById('jugadorTag').value.trim();
  const rol = document.getElementById('rol').value.trim();
  const elo = document.getElementById('elo').value.trim();
  const Correo = document.getElementById('correo').value.trim();

  if (!jugadorId || !jugadorTag || !rol || !elo || !Correo) {
    document.getElementById('mensaje').textContent = "❌ Todos los campos son obligatorios.";
    return;
  }

  // Puedes también guardar un hash del jugadorId en localStorage para más seguridad básica
  db.collection('inscripciones').add({
    jugadorId,
    jugadorTag,
    rol,
    elo,
    Correo,
    fecha: new Date()
  })
  .then(() => {
    document.getElementById('mensaje').textContent = "✅ Inscripción exitosa.";
    document.getElementById('registroForm').reset();
    localStorage.setItem('inscripcionCompletada', 'true');
    document.getElementById('registroForm').style.display = 'none';
  })
  .catch((error) => {
    console.error("Error al guardar:", error);
    document.getElementById('mensaje').textContent = "❌ Error: " + error.message;
  });
});

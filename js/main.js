document.addEventListener('DOMContentLoaded', () => {
  // No usamos localStorage aquí
  document.getElementById('registroForm').style.display = 'block';
});

document.getElementById('registroForm').addEventListener('submit', async function (e) {
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

  try {
    // Verificar si ya existe un jugador con ese correo, ID o Tag
    const consultaCorreo = await db.collection('inscripciones').where('Correo', '==', correo).get();
    const consultaId = await db.collection('inscripciones').where('jugadorId', '==', jugadorId).get();
    const consultaTag = await db.collection('inscripciones').where('jugadorTag', '==', jugadorTag).get();

    if (!consultaCorreo.empty || !consultaId.empty || !consultaTag.empty) {
      document.getElementById('mensaje').textContent = "⚠️ Ya estás inscrito con ese correo, ID o tag.";
      return;
    }

    // Si no existe, lo guardamos
    await db.collection('inscripciones').add({
      jugadorId,
      jugadorTag,
      rol,
      elo,
      Correo: correo,
      fecha: new Date()
    });

    document.getElementById('mensaje').textContent = "✅ Inscripción exitosa.";
    document.getElementById('registroForm').reset();
    document.getElementById('registroForm').style.display = 'none';

  } catch (error) {
    console.error("Error al verificar o guardar:", error);
    document.getElementById('mensaje').textContent = "❌ Error: " + error.message;
  }
});

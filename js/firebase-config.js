console.log("Firebase config cargado correctamente"); 

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRr5kzkmotrU-bYPt490VBCfVZuWVtt",
    authDomain: "lol-torneos.firebaseapp.com",
    projectId: "lol-torneos",
    storageBucket: "lol-torneos.firebasestorage.app",
    messagingSenderId: "471735158043",
    appId: "1:471735158043:web:4cde09de578cc0294c3",
    measurementId: "G-5SBZJVVZP0"
  };
  
  // Inicializar Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  
// Importa las bibliotecas necesarias
import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

// Lee las variables de entorno desde el archivo .env
dotenv.config();

// Define las variables que necesitas
const prefix = "!";

// Permisos que posee el cliente de discord y definiendo al mismo
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

// Comprobando que el bot se conecto con exito
client.once("ready", () => {
  console.log(`${client.user.username} esta en linea`);

  // Configurando la presencia del bot
  client.user.setActivity({
    name: "si es que podemos hablar", // El mensaje que quieres mostrar
    type: ActivityType.Watching, // Que se encuentra haciendo el bot, si leyendo, jugando, viendo, etc.
  });
});

// Inicia sesión en Discord utilizando el token de las variables de entorno
client.login(process.env.TOKEN);

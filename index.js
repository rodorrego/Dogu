// Importa las bibliotecas necesarias
require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  ChannelType,
  Partials,
} = require("discord.js");
const { runText, runImage } = require("./gemini.js");

// Permisos que posee el cliente de discord y definiendo al mismo
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Comprobando que el bot se conecto con exito
client.once("ready", () => {
  console.log(`${client.user.username} esta en linea`);

  // Configurando la presencia del bot
  client.user.setActivity({
    name: "si es que podemos hablar", // El mensaje que quieres mostrar
    type: "WATCHING", // Que se encuentra haciendo el bot, si leyendo, jugando, viendo, etc.
  });
});

const authorizedChannels = ["1165109581194731574"];

//Reacciones y interacciones
client.on("messageCreate", async (message) => {
  try {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) {
      //Respuestas generadas con la API de google Gemini
      const response = await runText(message.content);
      const results = splitResponse(response);
      results.forEach((results) => {
        message.reply(results);
      });
    }
    if (
      message.channel.type === ChannelType.GuildText &&
      authorizedChannels.includes(message.channel.id)
    ) {
      if (!message.mentions.users.has(client.user.id)) {
        return;
      } else {
        //Respuestas generadas con la API de google Gemini
        const response = await runText(message.content);
        const results = splitResponse(response);
        results.forEach((results) => {
          message.reply(results);
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
});

function splitResponse(response) {
  const maxChunkLength = 2000;
  let chunks = [];
  for (let i = 0; i < maxChunkLength; i += maxChunkLength) {
    chunks.push(response.substring(i, i + maxChunkLength));
  }
  return chunks;
}

// Inicia sesión en Discord utilizando el token de las variables de entorno
client.login(process.env.TOKEN);

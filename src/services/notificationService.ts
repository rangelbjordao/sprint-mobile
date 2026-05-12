import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const solicitarPermissaoNotificacao = async () => {
  const { status } = await Notifications.getPermissionsAsync();

  if (status === "granted") {
    return true;
  }

  return new Promise<boolean>((resolve) => {
    Alert.alert(
      "Permissão de Notificação",
      "O EmotiWave deseja enviar notificações sobre atualizações emocionais.",
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => resolve(false),
        },
        {
          text: "Permitir",
          onPress: async () => {
            const { status: novoStatus } =
              await Notifications.requestPermissionsAsync();

            resolve(novoStatus === "granted");
          },
        },
      ],
    );
  });
};

export const notificarRelatorioAtualizado = async () => {
  try {
    const permitido = await solicitarPermissaoNotificacao();

    if (!permitido) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "EmotiWave",
        body: "Seu Relatório Semanal foi atualizado.",
        data: {
          screen: "home",
        },
      },
      trigger: null,
    });
  } catch (error) {
    console.error("Erro ao disparar notificação:", error);
  }
};

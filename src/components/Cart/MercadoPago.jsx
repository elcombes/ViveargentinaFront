import React from "react";
import { useSelector } from "react-redux";
import { useMercadopago } from "react-sdk-mercadopago";

export default function MercadoPago() {
  const preferenceMercadoPagoId = useSelector(
    (state) => state.preferenceMercadoPagoId
  );

  const mercadopago = useMercadopago.v2(
    "APP_USR-1bae4ed7-a4e0-4237-b8ca-0b9e630f82bc",
    {
      locale: "es-AR",
    }
  );
  /*
  if (mercadopago) {
    mercadopago.checkout({
      preference: {
        id: preferenceMercadoPagoId,
      },
      render: {
        container: ".containerMercadoPago",
        label: "Pay",
      },
    });
  }
*/
  if (mercadopago && preferenceMercadoPagoId) {
    const checkout = mercadopago.checkout({
      preference: {
        id: preferenceMercadoPagoId,
      },
      autoOpen: true,
    });
  }

  return <></>;
}

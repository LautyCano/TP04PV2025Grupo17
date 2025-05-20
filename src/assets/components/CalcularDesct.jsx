   export const calcularPrecioConDescuento = (precio, descuento) => {
    const descuentoDecimal = descuento / 100;
    const precioConDescuento = precio * (1 - descuentoDecimal);
    return precioConDescuento.toFixed(2);
    };
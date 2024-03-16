document.addEventListener('DOMContentLoaded', function () {
    // Obtener todas las entradas de cantidad
    var cantidadInputs = document.querySelectorAll('.cantidad-input');

    // Agregar un evento de cambio a cada entrada de cantidad
    cantidadInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            calcularValor(input);
            calcularTotal();
        });
    });

    function calcularValor(input) {
        // Obtener la fila actual
        var fila = input.parentElement.parentElement;

        // Obtener la cantidad y la denominación
        var cantidad = parseInt(input.value);
        var denominacion = parseInt(fila.cells[0].innerText.replace('$', '').replace(/\./g, '').replace(',', ''));

        // Calcular el valor
        var valor = isNaN(cantidad) || isNaN(denominacion) ? 0 : cantidad * denominacion;

        // Actualizar el valor en el campo correspondiente
        fila.cells[2].getElementsByTagName('input')[0].value = '$ ' + valor.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    function calcularTotal() {
        // Obtener todas las filas
        var filas = document.querySelectorAll('tbody tr:not(:last-child)');

        // Inicializar total
        var total = 0;

        // Calcular el total sumando los valores de todas las filas
        filas.forEach(function (fila) {
            var valor = parseInt(fila.cells[2].getElementsByTagName('input')[0].value.replace('$', '').replace(/\./g, '').replace(',', ''));
            total += isNaN(valor) ? 0 : valor;
        });

        // Actualizar el total en la última fila
        var totalInput = document.querySelector('tbody tr:last-child td input');
        totalInput.value = '$ ' + total.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
});


<!-- resources/views/fios/index.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Lista de Fios</title>
</head>
<body>
    <h1>Lista de Fios</h1>
    @if ($fios->isEmpty())
        <p>Não há fios cadastrados.</p>
    @else
        <ul>
            @foreach ($fios as $fio)
                <li>{{ $fio->titulo }}</li>
            @endforeach
        </ul>
    @endif
</body>
</html>

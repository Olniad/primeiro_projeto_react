<!-- resources/views/fios/create.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Criar Fio</title>
</head>
<body>
    <h1>Criar Fio</h1>
    <form action="{{ url('/fios') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <label for="titulo">Título:</label>
        <input type="text" id="titulo" name="titulo" required><br><br>
        
        <label for="comentario">Comentário:</label>
        <textarea id="comentario" name="comentario" required></textarea><br><br>
        
        <label for="foto">Imagem:</label>
        <input type="file" id="foto" name="foto" required><br><br>
        
        <label for="senha">Senha:</label>
        <input type="password" id="senha" name="senha" required><br><br>
        
        <button type="submit">Criar</button>
    </form>
</body>
</html>

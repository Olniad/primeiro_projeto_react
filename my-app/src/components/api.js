/* const fetchFios = async () => {
  try {
    const token = document.head.querySelector('meta[name="csrf-token"]').content;

    const response = await fetch('http://localhost:8000/api/fios', {
      method: 'POST', // Aqui você deve usar POST
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token
      },
      body: JSON.stringify({
        // Seus dados aqui
      })
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Erro ao cadastrar fio:', error);
  }
};

fetchFios();
*/
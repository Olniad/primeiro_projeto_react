import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import axios from 'axios';

export default function Popup({ item, onClose }) {
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    console.log('Rendering Popup with item:', item); // Debug log

    const handleDelete = () => {
        if (!senha) {
            setError('A senha é obrigatória.');
            return;
        }
    
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    
        axios.delete(`http://localhost:8000/api/fios/${item.id}/apagar`, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            },
            data: {
                senha: senha // Envia a senha para o backend
            }
        })
        .then(res => {
            if (res.status === 200) {
                onClose(); // Fecha a popup
                window.location.reload(); // Atualiza a página para refletir a exclusão
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 404) {
                setError('Fio não encontrado ou já deletado.');
            } else if (error.response && error.response.status === 403) {
                setError('Senha incorreta. Tente novamente.');
            } else {
                console.error('Erro ao deletar o fio:', error);
                setError('Ocorreu um erro. Tente novamente.');
            }
        });
    };
    
      
    

    return (
<Dialog
    open={true}
    onClose={onClose}
    BackdropProps={{ style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' } }}
>
    <DialogTitle>
        <div>Deletar Fio</div>
    </DialogTitle>
    <DialogContent>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ marginBottom: '10px' }}>Insira a senha do seu fio para deletá-lo.</label>
            <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                style={{ marginBottom: '10px', padding: '8px', fontSize: '16px' }} 
            />
            {error && <p style={{color: 'red'}}>{error}</p>}
            <button 
                type="button" 
                className='btn_apagar' 
                onClick={handleDelete}
                style={{ padding: '10px 20px', fontSize: '16px' }}
            >
                Apagar
            </button>
        </form>
    </DialogContent>
</Dialog>
    );
    
    
}

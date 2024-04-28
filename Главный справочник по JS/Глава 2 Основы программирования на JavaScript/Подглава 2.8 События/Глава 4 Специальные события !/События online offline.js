// Подглава 4.3: События online/offline

// Событие изменения состояния сети (online/offline)
window.addEventListener('online', () => {
    console.log('Устройство подключено к сети');
});

window.addEventListener('offline', () => {
    console.log('Устройство отключено от сети');
});

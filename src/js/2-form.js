const form = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

let formData = { email: '', message: '' };

const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to Local Storage:', error);
    }
};

const getFromLocalStorage = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Error retrieving from Local Storage:', error);
        return {};
    }
};

const prefillForm = () => {
    const storedData = getFromLocalStorage(LOCAL_STORAGE_KEY);
    formData = { ...formData, ...storedData };

    form.elements.email.value = formData.email || '';
    form.elements.message.value = formData.message || '';
};

prefillForm();

form.addEventListener('input', ({ target }) => {
    formData[target.name] = target.value.trim();
    saveToLocalStorage(LOCAL_STORAGE_KEY, formData);
});

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const { email, message } = formData;

    if (!email || !message) {
        alert('Fill please all fields');
        return;
    }

    console.log('Form Data Submitted:', formData);

    form.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    formData = { email: '', message: '' };
});

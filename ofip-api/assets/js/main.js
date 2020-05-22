function validateForm() {
    
    var firstPassword = document.forms["form"]["password"].value;
    var secondPassword = document.forms["form"]["password_"].value;

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (firstPassword != secondPassword) {
        alert('As senhas devem ser iguais.');
        return false;
    }
    else {
        if (!strongRegex.test(firstPassword) || !strongRegex.test(secondPassword)) {
            alert('Sua senha deve conter: caracteres alfanuméricos maiúsculos e minúsculos e caracteres especiais. No mínimo 8 caracteres.');
            return false;
        }
        let params = (new URL(document.location)).searchParams;
        let hash = params.get("h");
        let id = parseInt(params.get("id"),10);

        document.forms["form"]["hash"].value = hash;
        document.forms["form"]["id"].value = id;
        
        return true;
    }
}
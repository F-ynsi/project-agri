class PinLogin {
    constructor ({el, maxNumbers = Infinity}) {
        this.el = {
            main: el,
            numPad: el.querySelector(".pin-login__numpad"),
            textDisplay1: el.querySelector(".fieldOne"),
            textDisplay2: el.querySelector(".fieldTwo"),
            textDisplay3: el.querySelector(".fieldThree"),
            textDisplay4: el.querySelector(".fieldFour"),
            togglePassword: el.querySelector("#togglePassword"),
        };
        this.maxNumbers = maxNumbers;
        this.p1 = []; 
        this.p2 = [];
        this.p3 = [];
        this.p4 = [];
        this.value = "";

        this._generatePad();
    }

    _generatePad() {
        const padLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "close", "0", "check"
        ]; 

        togglePassword.addEventListener('click', function(e){
            var d = Array.from(document.getElementsByTagName("input"));
            d.forEach(element =>{
                if (element.type === "password") {
                    element.type = "text";
                    return true
                } else {
                    element.type = "password";
                }
            });
            this.classList.toggle('fa-eye-slash');
        });
        
        padLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEl = document.createElement("div");

            if (key === "close") {
                keyEl.classList.add("close-button");
                keyEl.classList.toggle("material-icons", isNaN(key));

            } else if (key === "check") {
                keyEl.classList.add("check-button");
                keyEl.classList.toggle("material-icons", isNaN(key));
            } else {
                keyEl.classList.add("pin-login__key");
                keyEl.classList.toggle("material-icons", isNaN(key));
            }
            keyEl.textContent = key;
            keyEl.addEventListener("click", () => { this._handlekeyPress(key) });
            this.el.numPad.appendChild(keyEl); 

            if (insertBreak) {
                this.el.numPad.appendChild(document.createElement("br"));
            }
        });
    }

    _handlekeyPress(key) {
        switch (key) {
            case "close":
                switch (this.value.length){
                    case 4:
                        this.p4.pop();
                        break;
                    case 3:
                        this.p3.pop();
                        break;
                    case 2:
                        this.p2.pop();
                        break;
                    case 1:
                        this.p1.pop();
                        break;
                }
                this.value = this.value.substring (0, this.value.length - 1);                
                break;
            case "check": 
                this._attemptLogin();
                break;
            default:
                if (this.value.length < this.maxNumbers && !isNaN(key)) {
                    switch (this.value.length){
                        case 0:
                            this.p1.push(key);
                            break;
                        case 1:
                            this.p2.push(key);
                            break;
                        case 2:
                            this.p3.push(key);
                            break;
                        case 3:
                            this.p4.push(key);
                            break;
                    }
                    this.value += key;
                }
                break;
        }
        this._updateValueText();
    }

    _updateValueText() {
        this.el.textDisplay1.value = this.p1;
        this.el.textDisplay2.value = this.p2;
        this.el.textDisplay3.value = this.p3;
        this.el.textDisplay4.value = this.p4;
        this.el.textDisplay1.classList.remove("pin-loggin__text--error");
    }

    _attemptLogin() {
        if(this.value.length > 0) {
            if (this.value === "1234"){
                window.location.href = '../monitoring/monitoring.html';
            } else {
                window.location.href = '';
            }
        }
    }
}

class GameBoard {

    constructor() {
        this.canvas = document.querySelector("canvas");
        this.canvas.width = 400;
        this.canvas.height = 400;

        this.ctx = this.canvas.getContext('2d');

        this.addEventListeners();

    }


    isDrawing = false;


    fetchImage = async (context) => {
        let request = await fetch("http://localhost:8000/predict", context);
        let resp = await request.json();
        console.log(resp);
        document.querySelector(".result").innerHTML = resp.name;
    }



    predictImage() {
        let canvasData = this.canvas.toBlob((blob) => {
            let file = new File([blob], "myimage.jpg", { type: "image/jpeg" });


            let formData = new FormData();
            formData.append("file", file);

            this.fetchImage({ method: "POST", body: formData });


        })
    }

    mouseEvents = {
        mouseUp: (e) => {
            this.isDrawing = false;
            this.predictImage();
        },
        mouseMove: (e) => {
            if (!this.isDrawing) {
                return
            }

            this.ctx.lineTo(e.clientX, e.clientY)
            this.ctx.stroke();

        },
        mouseDown: (e) => {

            this.isDrawing = true;

            this.ctx.beginPath()
            this.ctx.moveTo(e.clientX, e.clientY)
        },
    }


    addEventListeners() {
        this.canvas.addEventListener("mousemove", this.mouseEvents.mouseMove);
        this.canvas.addEventListener("mouseup", this.mouseEvents.mouseUp);
        this.canvas.addEventListener("mousedown", this.mouseEvents.mouseDown);
    }
}


window.onload = () => {
    window.game = new GameBoard();
}
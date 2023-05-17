const form = document.querySelector("form"),
    fileInput = form.querySelector(".file-input"),
    progressArea = document.querySelector(".progress-area"),
    uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
    fileInput.click();
});

fileInput.onchange = ({ target }) => {
    let file = target.files[0];

    if (file) {
        let fileName = file.name;
        if (fileName.length >= 12) {
            let splitName = fileName.split(".");
            fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
        }
        uploadedFile(fileName);
    }
};

function uploadedFile(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/upload.php");
    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
        let fileLoaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 1000);

        let fileSize;
        fileTotal < 1024
            ? (fileSize = fileTotal + " KB")
            : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");

        let progressHTML = `
        <ul>
            <li class="row">
                <i class="fas fa-file-alt"></i>
                <div class="content">
                    <div class="details">
                        <span class="name">${name} • Uploading</span>
                        <span class="percent">${fileLoaded}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${fileLoaded}%"></div>
                    </div>
                </div>
            </li>
        </ul>`;
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML = progressHTML;

        if (loaded == total) {
            progressArea.innerHTML = "";
            let uploadedHTML = `
            <ul>
                <li class="row">
                    <i class="fas fa-file-alt"></i>
                    <div class="content">
                        <div class="uploaded-details">
                            <span class="name">${name} • Uploaded</span>
                            <span class="size">${fileSize}</span>
                        </div>
                    </div>
                    <button class="delete-file"> 
                        <i class="fas fa-close"></i>
                    </button>                
                </li>
            </ul>`;
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
        deleteFile();
    });
    let formData = new FormData(form);
    xhr.send(formData);
}

function deleteFile() {
    const removeFile = document.querySelectorAll(".delete-file");
    removeFile.forEach((item) => {
        item.addEventListener("click", (e) => {
            let parentElement = e.target.parentElement.parentElement;
            parentElement.remove();
        });
    });
}

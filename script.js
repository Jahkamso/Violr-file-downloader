const fileInput = document.querySelector("input"),
    downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevent submitting of form
    downloadBtn.innerHTML = "Downloading File..."
    fetchFile(fileInput.value);
})

function fetchFile(url) {
    // fetching file and returning as blob
    fetch(url).then(res => res.blob()).then(file => { 
        // URL.createObjectURL creates a url of passed object
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement("a");
        aTag.href = tempUrl; // passing tempURL as href value of <a> tag
        aTag.download = url.replace(/^.*[\\\/]/, ''); // passing file last name & extension as download value of <a> tag
        document.body.appendChild(aTag); // adding <a> inside body
        aTag.click(); // clicking <a> tag so the file download
        aTag.remove(); // removing <a> tag once file is downloaded
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerHTML = "Download File"
    }).catch(() => {
        downloadBtn.innerHTML = "Failed to Download file";
    })
}
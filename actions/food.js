function Food(){
    this.width = 10;
    this.height = 10;

    this.display = function() {
        var f = document.createElement('div');
        this.flag = f;
        f.style.width = this.width + 'px';
        f.style.height = this.height + 'px';
        f.style.background = 'red';
        f.style.borderRadius = '50%';
        f.style.position = 'absolute';
        this.x = Math.floor(Math.random()*80);
        this.y = Math.floor(Math.random()*40);
        f.style.left = this.x * this.width + 'px';
        f.style.top = this.y * this.height + 'px';
        map.appendChild(f);
    }
}
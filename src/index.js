Particle.count = 500;

function main() {
    var canvas = document.getElementById("canvas");
    var gl = canvas.getContext("webgl");
    if (!gl) {
        return;
    }

    document.addEventListener("keypress", event => {
        switch(event.key) {
            case 's': 
                trajectory = down;
                break;
            case 'w':
                trajectory = up;
                break;
            case 'e':
                trajectory = parabola;
                break;
            case 'd':
                trajectory = left;
                break;
            case 'a':
                trajectory = right;
                break;
            default:
                break;
        }
    });

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader", "fragment-shader"]);

    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var textureLocation = gl.getUniformLocation(program, "u_texture");
    var pMatrixUniformLocation = gl.getUniformLocation(program, "u_pMatrix");
    var mvMatrixUniformLocation = gl.getUniformLocation(program, "u_mvMatrix");

    var texture0 = gl.createTexture();
    var image0 = new Image();
    image0.src = "0.png";
    image0.addEventListener('load', function() {
        gl.bindTexture(gl.TEXTURE_2D, texture0);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image0);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);

        requestAnimationFrame(drawScene);
    });

    var texture1 = gl.createTexture();
    var image1 = new Image();
    image1.src = "1.png";
    image1.addEventListener('load', function() {
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image1);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.bindTexture(gl.TEXTURE_2D, null);

        requestAnimationFrame(drawScene);
    });

    var mvMatrix = mat4.create();
    var pMatrix = mat4.create();

    function drawParticles(positions, texture) {
        gl.useProgram(program);

        gl.uniformMatrix4fv(pMatrixUniformLocation, false, pMatrix);
        gl.uniformMatrix4fv(mvMatrixUniformLocation, false, mvMatrix);

        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(textureLocation, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

        gl.enableVertexAttribArray(positionAttributeLocation);

        gl.drawArrays(gl.POINTS, 0, positions.length / 3);
    }

    var particles = [];
    for (var i = 0; i < Particle.count; i++) {
        particles.push(new Particle());
    }

    var trajectory = down

    function drawScene() {
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(pMatrix, 45, gl.canvas.width / gl.canvas.height, 0.1, 100.0);
        mat4.identity(mvMatrix);
        mat4.translate(mvMatrix, mvMatrix, [0, 0, -3.5]);

        for (var i = 0; i < particles.length; i++) {
            particles[i].move(trajectory);
        }

        var positions0 = [];
        var positions1 = [];

        for (let i = 0; i < Particle.count; ++i) {
            if (i % 2 == 0) {
                positions0.push(particles[i].x);
                positions0.push(particles[i].y);
                positions0.push(0);
            }
            else {
                positions1.push(particles[i].x);
                positions1.push(particles[i].y);
                positions1.push(0);
            }
        }

        drawParticles(positions1, texture1);
        drawParticles(positions0, texture0);

        requestAnimationFrame(drawScene);
    }
}

main();
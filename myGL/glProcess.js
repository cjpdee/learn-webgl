/**
 * FUN STUFF
 */


/**
 * TEXTURES
 */

// Texture loader
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); // flip the texture, because on screens Y+ means down but in 3d space Y+ means up
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null); // removing texture from 'current' (cleaning up for next texture)
}

// Loading the texture (the specific texture)
var myTexture;
function initTextures() {
    myTexture = gl.createTexture();
    myTexture.image = new Image();
    myTexture.image.crossOrigin = "";
    
    gl.bindTexture(gl.TEXTURE_2D, myTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255,0,0,255]));
    myTexture.image.onload = function() {
        handleLoadedTexture(myTexture);
        console.log(myTexture);
    }
    myTexture.image.src = "nehe.gif";

}

/**
 * Making buffers / BUILDING
 */
var cubeVertexPositionBuffer;
var cubeVertexTextureCoordBuffer;
var cubeVertexIndexBuffer;

function initBuffers() {

    // CUBE VERTICES BUFFER
    cubeVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    vertices = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,
            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,
            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,
            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,
            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    cubeVertexPositionBuffer.itemSize = 3;
    cubeVertexPositionBuffer.numItems = 24;

    // CUBE COLORS BUFFER
    // cubeVertexColorBuffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexColorBuffer);
    // colors = [
    //   [1.0, 0.0, 0.0, 1.0],     // Front face
    //   [1.0, 1.0, 0.0, 1.0],     // Back face
    //   [0.0, 1.0, 0.0, 1.0],     // Top face
    //   [1.0, 0.5, 0.5, 1.0],     // Bottom face
    //   [1.0, 0.0, 1.0, 1.0],     // Right face
    //   [0.0, 0.0, 1.0, 1.0],     // Left face
    // ];
    // var unpackedColors = [];
    // for (var i in colors) {
    //   var color = colors[i];
    //   for (var j=0; j < 4; j++) {
    //     unpackedColors = unpackedColors.concat(color);
    //   }
    // }
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(unpackedColors), gl.STATIC_DRAW);
    // cubeVertexColorBuffer.itemSize = 4;
    // cubeVertexColorBuffer.numItems = 24;

    // CUBE TEXTURE BUFFER
    cubeVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    var textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    cubeVertexTextureCoordBuffer.itemSize = 2;
    cubeVertexTextureCoordBuffer.numItems = 24;

    /**
     * ELEMENT ARRAY BUFFER (to put together the cube)
     */

    cubeVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    var cubeVertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
    cubeVertexIndexBuffer.itemSize = 1;
    cubeVertexIndexBuffer.numItems = 36;
}


/**
 * RENDERING
 */
var xRot = 0;
var yRot = 0;
var zRot = 0;

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    mat4.identity(mvMatrix);

    // DRAW CUBE
    mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);

    mvPushMatrix(); // Add current (moved) mvMatrix value to stack
    // apply rotation to current position
    mat4.rotate(mvMatrix, degToRad(xRot), [1, 0, 0]);
    mat4.rotate(mvMatrix, degToRad(yRot), [0, 1, 0]);
    mat4.rotate(mvMatrix, degToRad(zRot), [0, 0, 1]);

    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    // Texture being pointed to
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexTextureCoordBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeVertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0,0);

    // Texture is applied
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, myTexture);
    gl.uniform1i(shaderProgram.samplerUniform, 0);


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
    setMatrixUniforms();
    gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    // restore initial position
    mvPopMatrix();
}

/**
 * ANIMATION
 */

var lastTime = 0;

// how much the object will rotate in 1 second
var rotation = 45;

// Rotation values for each object
var rCube = 0;

function animate() {
    var timeNow = new Date().getTime();
    if(lastTime != 0) {
        var elapsed = timeNow - lastTime;

        xRot -= (rotation * elapsed) / 1000.0;
        yRot -= (rotation * elapsed) / 1000.0;
        zRot -= (rotation * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}

function lol() {rotation += 20}


function tick() {
    requestAnimationFrame(tick);
    drawScene();
    animate();
}


/**
 * START FUNCTION
 */
function webGLStart() {
    var canvas = document.getElementById("lesson01-canvas");
    initGL(canvas);
    initShaders();
    initBuffers();
    initTextures();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // gl.enable(gl.DEPTH_TEST); // apparently you don't need this
    // drawScene();
    tick()
}
function createCube() {
    const cube = document.getElementById('cube');

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                const cubie = document.createElement('div');
                cubie.classList.add('cubie');
                cubie.style.transform = `translate3d(${x * 100}px, ${y * 100}px, ${z * 100}px)`;
                
                if (z === 1) cubie.classList.add('front');
                if (z === -1) cubie.classList.add('back');
                if (x === -1) cubie.classList.add('left');
                if (x === 1) cubie.classList.add('right');
                if (y === -1) cubie.classList.add('top');
                if (y === 1) cubie.classList.add('bottom');

                cube.appendChild(cubie);
            }
        }
    }
}

function rotateCube(axis, direction) {
    const cube = document.getElementById('cube');
    let currentTransform = cube.style.transform;
    
    const rotateMap = {
        'X': 'rotateX',
        'Y': 'rotateY',
        'Z': 'rotateZ'
    };

    let currentRotation = parseInt(currentTransform.match(new RegExp(`${rotateMap[axis]}\\((-?\\d+)deg\\)`))?.[1] || 0);
    currentRotation += direction * 90;
    
    cube.style.transform = currentTransform.replace(new RegExp(`${rotateMap[axis]}\\(-?\\d+deg\\)`), '') + ` ${rotateMap[axis]}(${currentRotation}deg)`;
}

createCube();

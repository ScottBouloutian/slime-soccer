const flame = {
    lifespan: 3000,
    image: 'white',
    bringToTop: true,
    blendMode: 'ADD',
    hsv: { initial: 0, value: 70, control: 'linear' },
    alpha: { initial: 0, value: 1, control: [{ x: 0, y: 1 }, { x: 0.5, y: 0.8 }, { x: 1, y: 0 }] },
    scale: { min: 0.5, max: 1.5 },
    vx: { min: -0.2, max: 0.2 },
    vy: { min: -1, max: -2 },
};

const spark = {
    lifespan: 3500,
    image: 'white',
    bringToTop: true,
    blendMode: 'ADD',
    alpha: { initial: 0, value: 1, control: [{ x: 0, y: 1 }, { x: 0.5, y: 0.9 }, { x: 1, y: 0 }] },
    scale: { initial: 0, value: 1, control: 'linear' },
    vx: { min: -0.2, max: 0.2 },
    vy: { min: -1, max: -2 },
};


const smoke = {
    lifespan: 3000,
    image: 'smoke',
    sendToBack: true,
    alpha: {
        initial: 0,
        value: 1,
        control: [{ x: 0, y: 0 }, { x: 0.2, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 }],
    },
    scale: { min: 1, max: 1.5 },
    vx: { min: -0.2, max: 0.2 },
    vy: { min: -1, max: -2 },
};

export default class Flame {
    constructor(manager) {
        const smokeEmitter = manager.createEmitter();
        const flameEmitter = manager.createEmitter();
        smokeEmitter.addToWorld();
        flameEmitter.addToWorld();
        this.smokeEmitter = smokeEmitter;
        this.flameEmitter = flameEmitter;
    }

    static create(manager) {
        manager.addData('flame', flame);
        manager.addData('spark', spark);
        manager.addData('smoke', smoke);
    }

    start() {
        this.smokeEmitter.emit('smoke', 400, 300, { delay: 3000, repeat: -1, frequency: 360 });
        this.flameEmitter.emit('spark', 400, 450, { repeat: -1, frequency: 140 });
        this.flameEmitter.emit('flame', 400, 450, { repeat: -1, frequency: 40 });
    }
}

import React, { useEffect } from 'react';
import * as THREE from 'three';

const ParticlesBackground = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const backgroundContainer = document.getElementById('background-container');
    if (backgroundContainer) {
      backgroundContainer.appendChild(renderer.domElement);
    }

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
      vertices.push(THREE.MathUtils.randFloatSpread(2000));
      vertices.push(THREE.MathUtils.randFloatSpread(2000));
      vertices.push(THREE.MathUtils.randFloatSpread(2000));
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: 0xFFFFFF });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (backgroundContainer) {
        backgroundContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="background-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '-1' }}></div>;
};

export default ParticlesBackground;

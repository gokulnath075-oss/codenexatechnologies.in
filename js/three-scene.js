/**
 * Dedicated Quantum Core 3D Engine using Three.js
 * Hardware-accelerated WebGL Interactive Quantum Holographic Core
 * Features:
 * - Central Pulsing Energy Nucleus with Dynamic Lighting
 * - Inner Faceted Crystal Octahedron with High Specular Reflection
 * - Outer Icosahedron Quantum Cage with Glowing Vertex Nodes
 * - Triple Harmonic Gimbal Rings with Orbiting Satellites
 * - Interactive 360° Mouse Parallax, Drag-to-Spin & Kinetic Inertia
 */

(function () {
  'use strict';

  function isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  if (!isWebGLAvailable() || typeof THREE === 'undefined') {
    console.warn('WebGL or Three.js not available. Using CSS visual fallback.');
    return;
  }

  const container = document.getElementById('webgl-canvas-container');
  if (!container) return;

  // Scene & Camera setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030712, 0.0015);

  const isMobileInitial = window.innerWidth < 768;
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1600);
  camera.position.z = isMobileInitial ? 310 : 240;

  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('webgl-canvas'),
    alpha: true,
    antialias: window.devicePixelRatio < 2,
    powerPreference: 'high-performance'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting System
  const ambientLight = new THREE.AmbientLight(0x78350f, 0.9);
  scene.add(ambientLight);

  const corePointLight = new THREE.PointLight(0xf59e0b, 2.0, 600);
  corePointLight.position.set(0, 0, 0);
  scene.add(corePointLight);

  const sideLightCyan = new THREE.PointLight(0xfbbf24, 2.2, 550);
  sideLightCyan.position.set(140, 160, 180);
  scene.add(sideLightCyan);

  const sideLightPurple = new THREE.PointLight(0xd97706, 2.0, 500);
  sideLightPurple.position.set(-150, -120, 120);
  scene.add(sideLightPurple);

  // Master Quantum Core Hierarchy
  const quantumCoreGroup = new THREE.Group();
  scene.add(quantumCoreGroup);

  // ==========================================================================
  // 1. Central Energy Nucleus (Pulsing Center)
  // ==========================================================================
  const nucleusGeo = new THREE.SphereGeometry(14, 32, 32);
  const nucleusMat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.95
  });
  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  quantumCoreGroup.add(nucleus);

  // Glowing Halo Sprite for Nucleus
  const haloCanvas = document.createElement('canvas');
  haloCanvas.width = 64;
  haloCanvas.height = 64;
  const haloCtx = haloCanvas.getContext('2d');
  const haloGrad = haloCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  haloGrad.addColorStop(0.3, 'rgba(245, 158, 11, 0.9)');
  haloGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.4)');
  haloGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
  haloCtx.fillStyle = haloGrad;
  haloCtx.fillRect(0, 0, 64, 64);

  const haloTexture = new THREE.CanvasTexture(haloCanvas);
  const haloMat = new THREE.SpriteMaterial({
    map: haloTexture,
    color: 0xfbbf24,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending
  });
  const haloSprite = new THREE.Sprite(haloMat);
  haloSprite.scale.set(45, 45, 1);
  quantumCoreGroup.add(haloSprite);

  // ==========================================================================
  // 2. Inner Faceted Crystal Octahedron
  // ==========================================================================
  const innerGeo = new THREE.OctahedronGeometry(38, 1);
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    wireframe: false,
    transparent: true,
    opacity: 0.65,
    roughness: 0.1,
    metalness: 0.95,
    emissive: 0x78350f,
    emissiveIntensity: 0.8
  });
  const innerCore = new THREE.Mesh(innerGeo, innerMat);
  quantumCoreGroup.add(innerCore);

  // Inner Core Glowing Wireframe Accent
  const innerWireMat = new THREE.MeshBasicMaterial({
    color: 0xfbbf24,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const innerWire = new THREE.Mesh(innerGeo, innerWireMat);
  quantumCoreGroup.add(innerWire);

  // ==========================================================================
  // 3. Outer Icosahedron Quantum Cage with Glowing Vertex Nodes
  // ==========================================================================
  const outerGeo = new THREE.IcosahedronGeometry(62, 2);
  const outerMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
    roughness: 0.15,
    metalness: 0.9,
    emissive: 0x92400e,
    emissiveIntensity: 0.5
  });
  const outerCage = new THREE.Mesh(outerGeo, outerMat);
  quantumCoreGroup.add(outerCage);

  // Glowing Points on Cage Vertices
  const vertexPointsMat = new THREE.PointsMaterial({
    size: 4.5,
    color: 0xfbbf24,
    map: haloTexture,
    transparent: true,
    opacity: 0.95,
    blending: THREE.AdditiveBlending
  });
  const vertexPoints = new THREE.Points(outerGeo, vertexPointsMat);
  outerCage.add(vertexPoints);

  // ==========================================================================
  // 4. Triple Harmonic Quantum Gimbal Rings
  // ==========================================================================
  // Ring 1 - Cyan Equatorial Ring
  const ring1Geo = new THREE.TorusGeometry(82, 0.9, 16, 120);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.65
  });
  const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  quantumCoreGroup.add(ring1);

  // Ring 2 - Electric Violet Ring
  const ring2Geo = new THREE.TorusGeometry(94, 0.75, 16, 120);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.7
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  ring2.rotation.x = -Math.PI / 5;
  quantumCoreGroup.add(ring2);

  // Ring 3 - Deep Emerald/Teal Oblique Ring
  const ring3Geo = new THREE.TorusGeometry(106, 0.6, 16, 120);
  const ring3Mat = new THREE.MeshBasicMaterial({
    color: 0xb45309,
    transparent: true,
    opacity: 0.45
  });
  const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
  ring3.rotation.z = Math.PI / 3.5;
  quantumCoreGroup.add(ring3);

  // Satellites orbiting the rings
  const satelliteGeo = new THREE.SphereGeometry(3.5, 16, 16);
  
  const sat1 = new THREE.Mesh(satelliteGeo, new THREE.MeshBasicMaterial({ color: 0xf59e0b }));
  sat1.position.set(82, 0, 0);
  ring1.add(sat1);

  const sat2 = new THREE.Mesh(satelliteGeo, new THREE.MeshBasicMaterial({ color: 0x00f0ff }));
  sat2.position.set(-94, 0, 0);
  ring2.add(sat2);

  const sat3 = new THREE.Mesh(satelliteGeo, new THREE.MeshBasicMaterial({ color: 0xb45309 }));
  sat3.position.set(0, 106, 0);
  ring3.add(sat3);

  // ==========================================================================
  // 5. Surrounding Quantum Particle Matrix (Depth Atmosphere)
  // ==========================================================================
  const particleCount = 1400;
  const particlesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const originalY = new Float32Array(particleCount);

  const cGold = new THREE.Color(0xfbbf24);
  const cCyan = new THREE.Color(0x00f0ff);
  const cWhite = new THREE.Color(0xffffff);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 1200;
    const y = (Math.random() - 0.5) * 850;
    const z = (Math.random() - 0.5) * 850;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    originalY[i] = y;

    const rand = Math.random();
    let col = cGold;
    if (rand < 0.25) col = cGold;
    else if (rand < 0.45) col = cWhite;

    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 4.2,
    vertexColors: true,
    map: haloTexture,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const particleSystem = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particleSystem);

  // Ground Grid Plane
  const gridGeo = new THREE.PlaneGeometry(1200, 1200, 36, 36);
  const gridMat = new THREE.MeshBasicMaterial({
    color: 0x451a03,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const gridMesh = new THREE.Mesh(gridGeo, gridMat);
  gridMesh.rotation.x = -Math.PI / 2.3;
  gridMesh.position.y = -210;
  gridMesh.position.z = -80;
  scene.add(gridMesh);

  // ==========================================================================
  // 6. Interactive Mouse, Drag-to-Spin & Inertia
  // ==========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let isDragging = false;
  let prevMouse = { x: 0, y: 0 };
  let scrollY = 0;
  let spinVelocityX = 0;
  let spinVelocityY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.16;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.16;

    if (isDragging) {
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      spinVelocityY = dx * 0.008;
      spinVelocityX = dy * 0.008;
      quantumCoreGroup.rotation.y += spinVelocityY;
      quantumCoreGroup.rotation.x += spinVelocityX;
      prevMouse = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mousedown', (e) => {
    if (e.clientY < window.innerHeight * 0.85) {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Mobile Touch Support for 3D Quantum Core
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1 && e.touches[0].clientY < window.innerHeight * 0.75) {
      isDragging = true;
      prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const touchX = e.touches[0].clientX;
      const touchY = e.touches[0].clientY;
      mouseX = (touchX - window.innerWidth / 2) * 0.16;
      mouseY = (touchY - window.innerHeight / 2) * 0.16;
      const dx = touchX - prevMouse.x;
      const dy = touchY - prevMouse.y;
      spinVelocityY = dx * 0.009;
      spinVelocityX = dy * 0.009;
      quantumCoreGroup.rotation.y += spinVelocityY;
      quantumCoreGroup.rotation.x += spinVelocityX;
      prevMouse = { x: touchX, y: touchY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset;
  });

  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 768;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.position.z = isMobile ? 310 : 240;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // Theme management for 3D Quantum Core
  window.setQuantumCoreTheme = function (themeName) {
    if (themeName === 'obsidian-violet') {
      corePointLight.color.setHex(0xc084fc);
      sideLightCyan.color.setHex(0xa855f7);
      sideLightPurple.color.setHex(0x818cf8);
      ambientLight.color.setHex(0x3b0764);
      nucleus.material.color.setHex(0xc084fc);
      haloSprite.material.color.setHex(0xa855f7);
      innerCore.material.color.setHex(0x7c3aed);
      innerCore.material.emissive.setHex(0x4c1d95);
      innerWire.material.color.setHex(0xc084fc);
      outerCage.material.color.setHex(0xa855f7);
      outerCage.material.emissive.setHex(0x581c87);
      vertexPoints.material.color.setHex(0xc084fc);
      ring1.material.color.setHex(0xc084fc);
      sat1.material.color.setHex(0xc084fc);
      ring2.material.color.setHex(0x818cf8);
      sat2.material.color.setHex(0x818cf8);
      ring3.material.color.setHex(0xec4899);
      sat3.material.color.setHex(0xec4899);
      gridMesh.material.color.setHex(0x2e1065);
      scene.fog.color.setHex(0x07050f);
    } else if (themeName === 'electric-emerald') {
      corePointLight.color.setHex(0x10b981);
      sideLightCyan.color.setHex(0x34d399);
      sideLightPurple.color.setHex(0x06b6d4);
      ambientLight.color.setHex(0x064e3b);
      nucleus.material.color.setHex(0x10b981);
      haloSprite.material.color.setHex(0x10b981);
      innerCore.material.color.setHex(0x059669);
      innerCore.material.emissive.setHex(0x064e3b);
      innerWire.material.color.setHex(0x34d399);
      outerCage.material.color.setHex(0x10b981);
      outerCage.material.emissive.setHex(0x065f46);
      vertexPoints.material.color.setHex(0x34d399);
      ring1.material.color.setHex(0x10b981);
      sat1.material.color.setHex(0x10b981);
      ring2.material.color.setHex(0x34d399);
      sat2.material.color.setHex(0x34d399);
      ring3.material.color.setHex(0x06b6d4);
      sat3.material.color.setHex(0x06b6d4);
      gridMesh.material.color.setHex(0x064e3b);
      scene.fog.color.setHex(0x02120b);
    } else if (themeName === 'midnight-gold') {
      corePointLight.color.setHex(0xf59e0b);
      sideLightCyan.color.setHex(0xfbbf24);
      sideLightPurple.color.setHex(0xd97706);
      ambientLight.color.setHex(0x78350f);
      nucleus.material.color.setHex(0xf59e0b);
      haloSprite.material.color.setHex(0xfbbf24);
      innerCore.material.color.setHex(0xd97706);
      innerCore.material.emissive.setHex(0x78350f);
      innerWire.material.color.setHex(0xfbbf24);
      outerCage.material.color.setHex(0xf59e0b);
      outerCage.material.emissive.setHex(0x92400e);
      vertexPoints.material.color.setHex(0xfbbf24);
      ring1.material.color.setHex(0xf59e0b);
      sat1.material.color.setHex(0xf59e0b);
      ring2.material.color.setHex(0xfbbf24);
      sat2.material.color.setHex(0xfbbf24);
      ring3.material.color.setHex(0xb45309);
      sat3.material.color.setHex(0xb45309);
      gridMesh.material.color.setHex(0x451a03);
      scene.fog.color.setHex(0x0a0804);
    } else { // cyber-cyan
      corePointLight.color.setHex(0x00f0ff);
      sideLightCyan.color.setHex(0x00f0ff);
      sideLightPurple.color.setHex(0x8b5cf6);
      ambientLight.color.setHex(0x0284c7);
      nucleus.material.color.setHex(0x00f0ff);
      haloSprite.material.color.setHex(0x00f0ff);
      innerCore.material.color.setHex(0x0ea5e9);
      innerCore.material.emissive.setHex(0x004466);
      innerWire.material.color.setHex(0x00f0ff);
      outerCage.material.color.setHex(0x00f0ff);
      outerCage.material.emissive.setHex(0x006688);
      vertexPoints.material.color.setHex(0x00f0ff);
      ring1.material.color.setHex(0x00f0ff);
      sat1.material.color.setHex(0x00f0ff);
      ring2.material.color.setHex(0x8b5cf6);
      sat2.material.color.setHex(0x8b5cf6);
      ring3.material.color.setHex(0x10b981);
      sat3.material.color.setHex(0x10b981);
      gridMesh.material.color.setHex(0x0c2547);
      scene.fog.color.setHex(0x030712);
    }
  };

  // Initialize with active theme (Obsidian Violet default)
  const initialTheme = 'midnight-gold';
  window.setQuantumCoreTheme(initialTheme);

  // Pulse animation on click trigger
  window.addEventListener('click', () => {
    haloSprite.scale.set(55, 55, 1);
    corePointLight.intensity = 2.4;
    setTimeout(() => {
      haloSprite.scale.set(45, 45, 1);
      corePointLight.intensity = 1.8;
    }, 300);
  });

  // Visibility optimization
  let isTabActive = true;
  document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
  });

  // ==========================================================================
  // 7. Core Animation Loop
  // ==========================================================================
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    if (!isTabActive) return;

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse parallax
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    // Smooth camera drift based on mouse & scroll
    camera.position.x = targetX * 0.5;
    camera.position.y = -targetY * 0.5 - (scrollY * 0.08);
    camera.lookAt(0, -scrollY * 0.05, 0);

    // Quantum Core Rotations & Drag Inertia
    if (!isDragging) {
      spinVelocityX *= 0.94;
      spinVelocityY *= 0.94;
      quantumCoreGroup.rotation.x += spinVelocityX;
      quantumCoreGroup.rotation.y += spinVelocityY + 0.008;
      quantumCoreGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.08;
    }

    // Dynamic Nucleus Pulse
    const pulse = 1 + Math.sin(elapsedTime * 3.5) * 0.12;
    nucleus.scale.set(pulse, pulse, pulse);
    haloSprite.scale.set(45 * pulse, 45 * pulse, 1);

    // Differential Speeds for Nested Elements
    innerCore.rotation.x += 0.015;
    innerCore.rotation.y += 0.018;

    outerCage.rotation.y -= 0.006;
    outerCage.rotation.x = Math.sin(elapsedTime * 0.6) * 0.12;

    ring1.rotation.z += 0.012;
    ring2.rotation.z -= 0.010;
    ring3.rotation.z += 0.008;

    // Gentle Floating Bob
    quantumCoreGroup.position.y = Math.sin(elapsedTime * 1.6) * 9;

    // Particle wave undulation
    const posArr = particlesGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3 + 1;
      posArr[idx] = originalY[i] + Math.sin(elapsedTime * 2 + i * 0.1) * 6;
    }
    particlesGeo.attributes.position.needsUpdate = true;

    // Ground Grid Wave
    const gridPos = gridGeo.attributes.position.array;
    for (let i = 0; i < gridPos.length; i += 3) {
      gridPos[i + 2] = Math.sin(elapsedTime * 1.5 + (gridPos[i] + gridPos[i + 1]) * 0.015) * 10;
    }
    gridGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
})();

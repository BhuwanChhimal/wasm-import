import React, { useState, useEffect } from 'react';

const App = () => {
  const [tflite, setTflite] = useState(null);
  const [tfliteSimd, setTfliteSimd] = useState(null);

  useEffect(() => {
    async function loadWasm() {
      const tfliteResponse = await fetch('tflite.wasm');
      const tfliteArrayBuffer = await tfliteResponse.arrayBuffer();
      const tfliteModule = await WebAssembly.compile(tfliteArrayBuffer);
      setTflite(tfliteModule);

      const tfliteSimdResponse = await fetch('tflite-simd.wasm');
      const tfliteSimdArrayBuffer = await tfliteSimdResponse.arrayBuffer();
      const tfliteSimdModule = await WebAssembly.compile(tfliteSimdArrayBuffer);
      setTfliteSimd(tfliteSimdModule);
    }
    loadWasm();
  }, []);

  return (
    <div>
      {tflite && <h1>tflite.wasm loaded</h1>}
      {tfliteSimd && <h1>tflite-simd.wasm loaded</h1>}
    </div>
  );
};

export default App;
pushd ..
node --experimental-modules scripts/generate_reducers.mjs
node --experimental-modules scripts/generate_reducer_index.mjs
node --experimental-modules scripts/generate_actions.mjs
popd

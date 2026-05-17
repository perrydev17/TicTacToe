const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const sharedDir = path.resolve(__dirname, '../shared');

// Let Metro watch files outside its root (the shared/ folder)
config.watchFolders = [...(config.watchFolders || []), sharedDir];

// Resolve @shared alias so imports like '@shared/hooks/useTicTacToe' work
config.resolver.extraNodeModules = {
  '@shared': sharedDir,
};

// When compiling files from shared/, Metro walks up from there and never
// finds native/node_modules. This forces it to always check here first.
config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];

module.exports = config;

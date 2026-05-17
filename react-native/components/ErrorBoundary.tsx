import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.setState({ hasError: false })}
          >
            <Text style={styles.btnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  title: {
    color: colors.textSub,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    backgroundColor: colors.white,
    borderRadius: 14,
  },
  btnText: {
    color: colors.black,
    fontWeight: '800',
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
});

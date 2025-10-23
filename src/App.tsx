import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import { EventsProvider } from './context/EventContext';
import { FollowProvider } from './context/FollowContext';

function App() {
  return (
    <AuthProvider>
      <VideoProvider>
        <EventsProvider>
          <FollowProvider>
            <NavigationContainer>
              <MainNavigator />
            </NavigationContainer>
          </FollowProvider>
        </EventsProvider>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;
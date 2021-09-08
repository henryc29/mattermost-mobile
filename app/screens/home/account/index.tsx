// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import StatusLabel from '@app/components/status_label';
import UserStatus from '@app/components/user_status';
import DrawerItem from '@components/drawer_item';
import FormattedText from '@components/formatted_text';
import {useTheme} from '@context/theme';
import {t} from '@i18n';
import {useRoute} from '@react-navigation/native';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import React from 'react';
import {Text, View} from 'react-native';
import Animated, {AnimatedLayout, FadeInLeft, FadeInRight} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        container: {
            flex: 1,
            backgroundColor: theme.sidebarBg,
        },
        body: {
            backgroundColor: theme.centerChannelBg,
            width: '100%',
            height: '60%',
            position: 'absolute',
            bottom: 0,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            overflow: 'hidden',
        },
        logOutFrom: {
            color: changeOpacity(theme.centerChannelColor, 0.64),
            fontSize: 12,
            lineHeight: 16,
            fontFamily: 'Open Sans',
            fontWeight: 'normal',
            marginLeft: 50,
        },
        menuLabel: {
            color: theme.centerChannelColor,
            fontSize: 16,
            lineHeight: 24,
            fontFamily: 'Open Sans',
            fontWeight: 'normal',
        },
    };
});

const AccountScreen = () => {
    const theme = useTheme();
    const route = useRoute();
    const params = route.params! as {direction: string};
    const entering = params.direction === 'left' ? FadeInLeft : FadeInRight;

    const styles = getStyleSheet(theme);

    const goToSavedMessages = () => {};

    const serverName = 'Community Server'; //fixme: get this value right

    //fixme: User Status is being refreshed at multiple places - consider storing this value in a state

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedLayout style={{flex: 1}}>
                <Animated.View
                    entering={entering.duration(150)}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={styles.body}
                    >
                        <DrawerItem
                            testID='account.status.action'
                            labelComponent={<StatusLabel labelStyle={styles.menuLabel}/>}
                            leftComponent={
                                <UserStatus
                                    size={24}
                                    status={'Online'}
                                />}
                            separator={false}
                            onPress={goToSavedMessages} // fixme : do onPress action
                            theme={theme}
                        />
                        <DrawerItem
                            testID='account.set_custom_message.action'
                            labelComponent={
                                <FormattedText
                                    id={t('account.set_custom_message')}
                                    defaultMessage='Set a Custom Status'
                                    style={styles.menuLabel}
                                />
                            }
                            iconName='emoticon-outline'
                            onPress={goToSavedMessages}
                            separator={true}
                            theme={theme}
                        />
                        <DrawerItem
                            testID='account.your_profile.action'
                            labelComponent={
                                <FormattedText
                                    id={t('account.your_profile')}
                                    defaultMessage='Your Profile'
                                    style={styles.menuLabel}
                                />
                            }
                            iconName='account-outline'
                            onPress={goToSavedMessages}
                            separator={false}
                            theme={theme}
                        />
                        <DrawerItem
                            testID='account.saved_messages.action'
                            labelComponent={
                                <FormattedText
                                    id={t('account.saved_messages')}
                                    defaultMessage='Saved Messages'
                                    style={styles.menuLabel}
                                />
                            }
                            iconName='bookmark-outline'
                            onPress={goToSavedMessages}
                            separator={false}
                            theme={theme}
                        />
                        <DrawerItem
                            testID='account.settings.action'
                            labelComponent={
                                <FormattedText
                                    id={t('account.settings')}
                                    defaultMessage='Settings'
                                    style={styles.menuLabel}
                                />
                            }
                            iconName='settings-outline'
                            onPress={goToSavedMessages}
                            separator={true}
                            theme={theme}
                        />
                        <DrawerItem
                            testID='account.logout.action'
                            labelComponent={
                                <FormattedText
                                    id={t('account.logout')}
                                    defaultMessage='Log out'
                                    style={[styles.menuLabel, {color: theme.dndIndicator}]}
                                />
                            }
                            iconName='exit-to-app'
                            isDestructor={true}
                            onPress={goToSavedMessages}
                            separator={false}
                            theme={theme}
                        />
                        <FormattedText
                            id={t('account.logout_from')}
                            defaultMessage={'Log out of {serverName}'}//fixme: construct server name
                            values={{serverName}}
                            style={styles.logOutFrom}
                        />
                    </View>
                </Animated.View>
            </AnimatedLayout>
        </SafeAreaView>
    );
};

export default AccountScreen;
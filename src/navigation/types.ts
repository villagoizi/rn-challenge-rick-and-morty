import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { RootStackParamList } from './ParamList/RootStackParamList'
import {BottomTabParamList} from './ParamList/BottomTabParamList'
import {MainStackParamList} from './ParamList/MainStackParamList'


export type PropsRoot<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>
    route: RouteProp<RootStackParamList, T>
}
export type PropsBottom<T extends keyof BottomTabParamList> ={
    navigation: BottomTabScreenProps<BottomTabParamList,T>
    route: RouteProp<BottomTabParamList, T>
}

export type PropsMain<T extends keyof MainStackParamList> = {
    navigation: StackNavigationProp<MainStackParamList, T>
    route: RouteProp<MainStackParamList, T>
}
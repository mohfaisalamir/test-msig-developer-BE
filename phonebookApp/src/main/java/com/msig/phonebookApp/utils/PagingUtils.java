package com.msig.phonebookApp.utils;

public class PagingUtils {
    public static String validateDirection(String direction) {
        return direction.equals("ASC") || direction.equals("DSC") ? direction : "ASC";
    }

}

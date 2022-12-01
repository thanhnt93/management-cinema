

public class ThanhNT {
    static int decToOct(int number){
        int p = 0;
        int octNumber = 0;
        while(number > 0){
            octNumber += (number % 8) * Math.pow(10, p);
            p++;
            number /= 8;
        }
        return octNumber;
    }

    public static void main(String[] args) {
        int number = decToOct(100);
        System.out.println("Thập phân sang bát phân: " + number);
    }
}

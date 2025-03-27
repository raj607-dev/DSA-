import java.util.Arrays;

class Solution {
    public int eliminateMaximum(int[] dist, int[] speed) {
        int n = dist.length;
        double[] arrivalTime = new double[n];
        
        // Compute time each monster takes to reach the city
        for (int i = 0; i < n; i++) {
            arrivalTime[i] = (double) dist[i] / speed[i];
        }
        
        // Sort the arrival times
        Arrays.sort(arrivalTime);
        
        // Eliminate monsters one by one
        for (int i = 0; i < n; i++) {
            if (arrivalTime[i] <= i) {
                return i;  // We lose at this point
            }
        }
        
        return n;  // We managed to eliminate all monsters
    }
}

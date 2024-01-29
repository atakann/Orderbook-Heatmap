import json
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import numpy as np

# Load data from JSON file
with open('public/filteredData.json', 'r') as file:
    data = json.load(file)

# Extract amounts
amounts = [item['amount'] for item in data]

# Find maximum amount
max_amount = max(amounts)

# Print the maximum amount
print("Maximum Amount:", max_amount)

# Calculate descriptive statistics
mean_amount = np.mean(amounts)
median_amount = np.median(amounts)
# Mode calculation
mode_result = stats.mode(amounts)
mode_amount = mode_result[0] if np.isscalar(mode_result[0]) else mode_result[0][0]


print(f"Mean Amount: {mean_amount:.2f}")
print(f"Median Amount: {median_amount:.2f}")
print(f"Mode Amount: {mode_amount:.2f}")

# Calculate specific percentiles
percentiles = np.percentile(amounts, [25, 50, 75, 90])
print("25th, 50th (Median), 75th, 90th Percentiles:", percentiles)

# Distribution of amounts
plt.figure(figsize=(10, 6))
sns.histplot(amounts, bins=50, kde=True)
plt.title('Distribution of Amounts')
plt.xlabel('Amount')
plt.ylabel('Frequency')

# Focus on the range where most of the data lies
plt.xlim(0, 50) # Adjust this based on your observations

plt.show()

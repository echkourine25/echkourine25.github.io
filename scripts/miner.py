import hashlib
import time
import requests
from multiprocessing import Process, Queue, current_process
# URL of the file containing the IPv6 address
url = 'https://echkourine25.github.io/rc/myipv6.txt'

try:
    # Send the HTTP GET request to fetch the IPv6 address
    response = requests.get(url)

    # Raise an exception if the request was unsuccessful
    response.raise_for_status()

    # Get the content of the response and strip any leading/trailing whitespace
    myipv6 = response.text.strip()

except requests.RequestException as e:
    # Fallback to a default value if there's any issue with the request
    print(f"Error fetching IPv6 address: {e}")
    myipv6 = '2a01:cb06:3d0:c400:75df:4521:5212:9464'

# Replace with the actual URL of your server
server_url = f'http://[{myipv6}]:8080'
def fetch_mine_data():
    response = requests.get(f'{server_url}/mine_data')
    data = response.json()
    return data['last_proof'], data['difficulty']

def proof_of_work(last_proof, difficulty, queue):
    proof = 0
    while not valid_proof(last_proof, proof, difficulty):
        proof += 1
    queue.put(proof)
    return proof

def valid_proof(last_proof, proof, difficulty):
    guess = f'{last_proof}{proof}'.encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    return guess_hash[:difficulty] == "0" * difficulty

def submit_proof(proof, miner_email):
    data = {'proof': proof, 'miner_email': miner_email}
    response = requests.post(f'{server_url}/mine', json=data)
    return response.json()

def mine(miner_email, queue):
    last_proof, difficulty = fetch_mine_data()
    proof = proof_of_work(last_proof, difficulty, queue)
    result = submit_proof(proof, miner_email)
    print(result)

def worker(miner_email, queue):
    while True:
        mine(miner_email, queue)

def main(miner_email, num_processes):
    queue = Queue()
    processes = []
    try:
        for _ in range(num_processes):
            p = Process(target=worker, args=(miner_email, queue))
            p.start()
            processes.append(p)

        # Collect the result from the first successful process
        proof = queue.get()
        print(f'Proof found: {proof}')

        # Terminate all processes
        for p in processes:
            p.terminate()
            p.join()
    finally:
        for p in processes:
            if p.is_alive():
                p.terminate()
                p.join()

if __name__ == '__main__':
    miner_email = 'echkourine@icloud.com'
    num_processes = 24  # Number of processes to fork
    while True:
        main(miner_email, num_processes)

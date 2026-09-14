import socket
import dns.resolver

def check_email_domain(email):
    try:
        domain = email.split('@')[1]
        records = dns.resolver.resolve(domain, 'MX')
        print(f"\n[+] The domain {domain} is valid and accepts mail:")
        for rdata in records:
            print(f"    - Mail Server: {rdata.exchange}")
    except IndexError:
        print("[-] Invalid email format.")
    except dns.resolver.NXDOMAIN:
        print("[-] The domain does not exist.")
    except Exception as e:
        print(f"[-] An error occurred: {e}")

if __name__ == "__main__":
    target_email = input("Enter email to check: ")
    check_email_domain(target_email)


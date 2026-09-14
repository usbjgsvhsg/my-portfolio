import socket
import dns.resolver

def check_email_domain(email):
    try:
        domain = email.split('@')[1]
        # فحص وجود سجلات البريد MX للنطاق للتأكد من استقباله للرسائل
        records = dns.resolver.resolve(domain, 'MX')
        print(f"\n[+] النطاق {domain} صالح ويستقبل الرسائل:")
        for rdata in records:
            print(f"    - خادم البريد: {rdata.exchange}")
    except IndexError:
        print("[-] البريد الإلكتروني المدخل غير صحيح.")
    except dns.resolver.NXDOMAIN:
        print(f"[-] النطاق غير موجود أصلاً.")
    except Exception as e:
        print(f"[-] حدث خطأ أثناء الفحص: {e}")

if __name__ == "__main__":
    target_email = input("أدخل البريد الإلكتروني للفحص: ")
    check_email_domain(target_email)


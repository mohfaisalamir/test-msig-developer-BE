package com.msig.phonebookApp.sevice;

import com.msig.phonebookApp.dto.request.SearchContactRequest;
import com.msig.phonebookApp.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ContactService {
    Contact addContact(Contact contact);
    List<Contact> getContactsByName(String name);
    List<Contact> getAllContacts();
    Contact updateContact(String name, Contact contact);
    void deleteContact(String id);

}

/*Customer createCustomer(Customer customer);
    Customer updateCustomer(Customer customer);
    Customer getCustomerById(String id);
    Page<Customer> getAllCustomers(SearchCustomerRequest request);
    void deleteCustomer(String id);*/
